import { NextRequest, NextResponse } from 'next/server';

const MONDAY_API_URL = 'https://api.monday.com/v2';
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;
const MONDAY_BOARD_ID = process.env.MONDAY_BOARD_ID;
const MONDAY_GROUP_ID = process.env.MONDAY_GROUP_ID;

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

    // Success response
    return NextResponse.json({
      success: true,
      mondayItemId: mondayData.data?.create_item?.id,
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