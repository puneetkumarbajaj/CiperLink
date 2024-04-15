"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState } from 'react';
import * as snarkjs from 'snarkjs';

function ProofGenerator() {
    const [password, setPassword] = useState('');
    const [username , setUsername] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [isMismatched, setIsMismatched] = useState(false);

    async function handleGenerateProof() {
        try {
            const passwordBigInt = hashPasswordToBigInt(password);
            const input = { "secret" : passwordBigInt };
            const { proof, publicSignals } = await snarkjs.plonk.fullProve(input, "/generate_proof.wasm", "/circuit_final.zkey");
            registerOnMongo({ proof, publicSignals});

        } catch ( error ) {
        }
    }

    function hashPasswordToBigInt(password: string) {
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        return BigInt('0x' + hash);
    }

    async function registerOnMongo({ proof, publicSignals}: { proof: any, publicSignals: any}) {
        try {
            console.log('Registering user', username, proof, publicSignals);
            const user_data = JSON.stringify({
                username,
                proof,
                publicSignals
            });
            console.log('User data:', user_data);
            const response = await fetch('/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: user_data
            });
        
            if (!response.ok) {
              throw new Error('Failed to register user: ' + response.status);
            }
        
            const data = await response.json(); // Only parse as JSON if the response was ok
            console.log('Registration successful', data);
          } catch (error) {
            console.error('Error submitting registration', error);
          }
      }
      

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleCPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCPassword(event.target.value);
        if (password !== event.target.value) {
            setIsMismatched(true);
        } else {
            setIsMismatched(false);
        }
    }

    const handleSignupClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if ((password === cpassword)&&(username !== '')&&(password !== '')) {
            handleGenerateProof();
        }
    }

    const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log('Login clicked');
    }

    return (
        <div className='h-full w-full flex justify-center items-center'>
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                    Login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={username} onChange={handleUsernameChange}/>
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type='password' value={password} onChange={handlePasswordChange}/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleLoginClick}>Login</Button>
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="signup">
                <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Create a new account to start your journey.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="email">Username</Label>
                    <Input id="email" value={username} onChange={handleUsernameChange}/>
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" value={cpassword} onChange={handleCPasswordChange} />
                    </div>
                    {isMismatched && (
                        <div style={{ color: 'red' }}>
                            Passwords do not match.
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSignupClick} disabled={isMismatched}>Sign Up</Button>
                </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
    );
}

export default ProofGenerator;
