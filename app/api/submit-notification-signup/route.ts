import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const MONDAY_API_URL = 'https://api.monday.com/v2';
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;
const MONDAY_BOARD_ID = process.env.MONDAY_BOARD_ID;
const MONDAY_GROUP_ID = process.env.MONDAY_GROUP_ID;

// Resend configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SEGMENT_IDS = [
  'd59f2521-c4fd-4b4f-8dd3-219453eccb36',
  '1d910727-6aaa-4ca0-9029-8f0f13d41e5f'
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, countryOfService, howDidYouHear } = body;

    // Validation
    if (!fullName || !email || !countryOfService || !howDidYouHear) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for required environment variables
    if (!MONDAY_API_TOKEN || !MONDAY_BOARD_ID || !MONDAY_GROUP_ID) {
      console.error('Missing Monday.com environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!RESEND_API_KEY) {
      console.error('Missing Resend API key');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Prepare column values for Monday.com
    // Based on the board structure we queried:
    // - name: Full name (name column)
    // - date4: Submission date (date column) 
    // - text_mkx7k8em: Email (text column)
    // - text_mkycsx1j: Country of Service (text column)
    // - text_mkycqwwf: How did you hear about Alpha-Bet (text column)
    const columnValues = JSON.stringify({
      "date4": new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      "text_mkx7k8em": email,
      "text_mkycsx1j": countryOfService,
      "text_mkycqwwf": howDidYouHear
    });

    // GraphQL mutation for Monday.com
    const mutation = `
      mutation ($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
        create_item(
          board_id: $boardId
          group_id: $groupId
          item_name: $itemName
          column_values: $columnValues
        ) {
          id
        }
      }
    `;

    const variables = {
      boardId: MONDAY_BOARD_ID,
      groupId: MONDAY_GROUP_ID,
      itemName: fullName, // This goes to the "name" column
      columnValues: columnValues
    };

    // Submit to Monday.com
    const mondayResponse = await fetch(MONDAY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MONDAY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables: variables
      }),
    });

    const mondayData = await mondayResponse.json();

    // Check for Monday.com errors
    if (mondayData.errors) {
      console.error('Monday.com API errors:', mondayData.errors);
      return NextResponse.json(
        { error: 'Failed to submit to Monday.com', details: mondayData.errors },
        { status: 500 }
      );
    }

    if (!mondayResponse.ok) {
      console.error('Monday.com API error:', mondayData);
      return NextResponse.json(
        { error: 'Failed to submit to Monday.com' },
        { status: 500 }
      );
    }

    // Initialize Resend client
    const resend = new Resend(RESEND_API_KEY);

    // Extract first and last name from full name
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Helper function to add delay between API calls
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Add contact to Resend with segments
    let resendContactId = null;
    try {
      const { data: contactData, error: contactError } = await resend.contacts.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        unsubscribed: false,
      });

      if (contactError) {
        console.error('Resend contact creation error:', contactError);
        // Don't fail the whole request for Resend errors
      } else {
        resendContactId = contactData?.id;
        console.log('Contact created in Resend:', resendContactId);

        // Add delay before segment operations to respect rate limit
        await delay(600); // 600ms delay (safe margin under 2 req/sec limit)

        // Add contact to both segments with delays between calls
        for (let i = 0; i < SEGMENT_IDS.length; i++) {
          const segmentId = SEGMENT_IDS[i];
          try {
            // Use the correct API method to add contact to segment
            const { error: segmentError } = await resend.contacts.segments.add({
              email: email,
              segmentId: segmentId,
            });
            
            if (segmentError) {
              console.error(`Error adding contact to segment ${segmentId}:`, segmentError);
            } else {
              console.log(`Contact added to segment: ${segmentId}`);
            }

            // Add delay between segment updates if there's another one
            if (i < SEGMENT_IDS.length - 1) {
              await delay(600);
            }
          } catch (segmentErr) {
            console.error(`Segment addition error for ${segmentId}:`, segmentErr);
          }
        }
      }
    } catch (resendError) {
      console.error('Resend integration error:', resendError);
      // Don't fail the whole request for Resend errors
    }

    // Success response
    return NextResponse.json({
      success: true,
      mondayItemId: mondayData.data?.create_item?.id,
      resendContactId: resendContactId,
      message: 'Notification signup submitted successfully'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}