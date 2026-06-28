import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

/**
 * MiniPay linkUrl opens `/`. Rewrite to the bridge UI in-place so the URL
 * stays at the app root (no redirect flash). Landing lives at `/welcome`.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/bridge", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}
