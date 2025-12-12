import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";
import { AuthResponse, User } from "./auth.model";
import {v4 as uuidv4} from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private http = inject(HttpClient);
    private usersURL = 'http://localhost:3000/users';

    //register

    register(credentials: {name: string, email: string, password: string}): Observable<User> {
        const newUser: User = {
            id: uuidv4(),
            name: credentials.name,
            email: credentials.email            
        }

        const userToSave = {...newUser, password: credentials.password}

        return this.http.get<User[]>(`${this.usersURL}?email=${credentials.email.toLocaleLowerCase()}`).pipe(
            switchMap(existingUser => {
                if(existingUser.length > 0) {
                    return throwError(() => new Error('Email already exists'));
                }
                return this.http.post<User>(this.usersURL, userToSave).pipe(
                    map(() => newUser)
                )

            }),
            catchError(this.handleError)
        )
    }

    //login

    login(credentials: {email: string; password: string}): Observable<AuthResponse> {
        return this.http.get<any[]>(
            `${this.usersURL}?email=${credentials.email.toLocaleLowerCase()}$password=${credentials.password}`
        ).pipe(
            map(users => {
                if (users.length > 0) {
                    const user = users[0];

                    const {password, ...userWithoutPassword} = user;

                    return {
                        user: userWithoutPassword,
                        accessToken: `mockToken-${user.id}-${new Date().getTime()}`
                    }
                }else {
                    throw new Error('Invalid Username/password');
                }
            }),
            catchError(this.handleError))        
    }

    handleError(error: any): Observable<never> {
        console.error(error);
        let errorMessage = 'An unknown error occured during authentication'

        if(error.message) {
            errorMessage = error.message;
        }
        else if (error.status) {
            errorMessage = `Server error: ${error.status}`;
        }

        return throwError(() => new Error(errorMessage));
    }

    
}