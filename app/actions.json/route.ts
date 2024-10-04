import { NextResponse } from 'next/server';

export async function GET() {
    const actionsJson = {
        rules: [
            {
                pathPattern: "/*",
                apiPath: "/api/actions/*"
            },
            {
                pathPattern: "/api/actions/**",
                apiPath: "/api/actions/**"
            }
        ]
    };

    return NextResponse.json(actionsJson);
}