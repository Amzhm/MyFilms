import bcrypt from 'bcryptjs';
import { user } from '../../../repository/user';

export async function POST(request: Request): Promise<Response> {
    const { username, password } = await request.json();
    console.log('Username:', username);
    console.log('Password:', password);
    if (username === user.username && bcrypt.compareSync(password, user.password)) {
        
        return new Response(JSON.stringify({ isAuthenticated: true }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ isAuthenticated: false }), { status: 401 });
    }
}