"use client";
import React from 'react';
import ProofGenerator from './components/ProofGenerator';

export default function Home() {
  const handleProofSubmission = async ({ proof, publicSignals, password }: { proof: any, publicSignals: any, password: any }) => {
    console.log('Register with:', password, proof, publicSignals);
    // Here you could send the proof and public signals to the backend for further verification
  };

  return (
    <div>
      <h1>User Registration</h1>
      <ProofGenerator onSubmit={handleProofSubmission} formLabel={undefined} buttonText={"submit"} />
    </div>
  );
}
