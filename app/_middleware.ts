import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = localStorage.get('token'); 
    const url = request.nextUrl.clone();
    const publicPaths = ['/login', '/register']; 
    
    if (!publicPaths.includes(url.pathname) && !token) {
        url.pathname = '/login'; 
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}