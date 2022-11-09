import "express-session"
declare module 'express-session' {
    export interface SessionData {
        views: { [key: string]  : number }
    }
}