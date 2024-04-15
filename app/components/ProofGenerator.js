import React, { useState } from 'react';
import * as snarkjs from 'snarkjs';

function ProofGenerator({ onSubmit, formLabel, buttonText }) {
    const [password, setPassword] = useState('');

    async function handleGenerateProof(event) {
        event.preventDefault();
        let wasmBuffer, zkeyBuffer;
        console.log("Starting proof generation process...");

        // Generate proof
        try {
            console.log("Hashing password...");
            const passwordBigInt = hashPasswordToBigInt(password);
            console.log("Password hashed to BigInt:", passwordBigInt.toString());

            const input = { "secret" : passwordBigInt };
            console.log("Input prepared, starting fullProve...", input);
            
            const { proof, publicSignals } = await snarkjs.plonk.fullProve(input, "/generate_proof.wasm", "/circuit_final.zkey");
            console.log("Proof generated successfully.");

            console.log("Proof:", proof);
            console.log("Public Signals:", publicSignals);

            onSubmit({ proof, publicSignals, password });
        } catch ( error ) {
            console.error("Error generating proof:", error);
        }
    }

    function hashPasswordToBigInt(password) {
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        return BigInt('0x' + hash);
    }

    return (
        <div>
            <h1>{formLabel}</h1>
            <form onSubmit={handleGenerateProof}>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                />
                <button type="submit">{buttonText}</button>
            </form>
        </div>
    );
}

export default ProofGenerator;
