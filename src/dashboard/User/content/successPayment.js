import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { getUserProfile } from "../../../firebase/firebase";

export default function SuccessPayment() {


  return (
    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
      <p>
        The payment is successfull
      </p>
    </div>
  )
}
