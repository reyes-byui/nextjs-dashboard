import { NextResponse } from 'next/server';
import postgres from 'postgres';

export async function GET() {
  try {
    // Test database connection with detailed error info
    const dbUrl = process.env.POSTGRES_URL;
    
    if (!dbUrl) {
      return NextResponse.json({ 
        error: 'POSTGRES_URL not found in environment variables',
        availableKeys: Object.keys(process.env).filter(key => key.includes('POSTGRES') || key.includes('DATABASE'))
      }, { status: 500 });
    }

    // Try to connect to the database
    console.log('Attempting database connection...');
    const sql = postgres(dbUrl, { ssl: 'require' });
    
    try {
      // Simple query to test connection
      const result = await sql`SELECT 1 as test`;
      await sql.end();
      
      return NextResponse.json({ 
        message: 'Database connection successful!',
        testResult: result[0],
        connectionString: dbUrl.replace(/:[^:]*@/, ':****@') // Hide password
      });
    } catch (dbError: any) {
      await sql.end();
      console.error('Database connection error:', dbError);
      
      return NextResponse.json({ 
        error: 'Database connection failed',
        details: dbError?.message || String(dbError),
        code: dbError?.code || 'UNKNOWN',
        connectionString: dbUrl.replace(/:[^:]*@/, ':****@') // Hide password
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('General error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
