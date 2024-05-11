import { useRef, useEffect, useState } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import emailjs from '@emailjs/browser';

export default function reportInaccuracyForm() {
  useEffect(() => emailjs.init('service_wkf9g74'), []);
}
