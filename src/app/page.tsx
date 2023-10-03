"use client";

import React, { useState } from 'react';
import Input from '@/components/Input';
import Widget from "@/components/Widget";
import { InputConfig } from '@/utils/input';
import styles from '@/styles/modules/page.module.scss';

export default function Home() {
  const [userId, setUserId] = useState<string>("64fc8956eea9a7d89a5f901e");
  const [radius, setRadius] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState<string>("#181825");
  const [textColor, setTextColor] = useState<string>("#eaefff");
  const [dueDate, setDueDate] = useState<boolean>(false);
  const [priority, setPriority] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, stateKey: string) => {
    const newValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;

    switch (stateKey) {
      case "userId":
        setUserId(newValue as string);
        break;
      case "radius":
        setRadius(newValue as boolean);
        break;
      case "backgroundColor":
        setBackgroundColor(newValue as string);
        break;
      case "textColor":
        setTextColor(newValue as string);
        break;
      case "dueDate":
        setDueDate(newValue as boolean);
        break;
      case "priority":
        setPriority(newValue as boolean);
        break;
      default:
        break;
    }
  };

  const handleCopyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const HTMLWidget = (userId: string, radius: boolean, backgroundColor: string, textColor: string, dueDate: boolean, priorityLevel: boolean) => {
    return `
      <iframe src="http://localhost:3000/widget?userId=${userId}&radius=${radius}&backgroundColor=${backgroundColor}&textColor=${textColor}&dueDate=${dueDate}&priorityLevel=${priorityLevel}" width="300" height="200" frameborder="0"></iframe>
    `;
  };

  return (
    <main className={styles.main}>
      <section className={styles.heading}>
        <h1>Vbusy Widget Builder</h1>
        <p>Retrieve your unique user ID from your Vbusy account settings.</p>
      </section>


      <iframe src="http://localhost:3000/widget?userId=64fc8956eea9a7d89a5f901e&radius=true&backgroundColor=#181825&textColor=#eaefff&dueDate=false&priorityLevel=false" width="300" height="200" frameBorder="0"></iframe>

      <section className={styles.preview}>
        <h2>Preview</h2>
        <Widget userId={userId} radius={radius} backgroundColor={backgroundColor} textColor={textColor} dueDates={dueDate} priorityLevel={priority} />
      </section>

      <section className={styles.options}>
        <Input
          inputValues={{ userId, radius, backgroundColor, textColor, dueDate, priority }}
          handleInputChange={handleInputChange}
          inputConfig={InputConfig}
        />
      </section>

      <section className={styles.iframeCode}>
        <h2>Raw HTML</h2>
        <textarea
          id="iframeCode"
          readOnly
          value={HTMLWidget(userId, radius, backgroundColor, textColor, dueDate, priority)}
        ></textarea>
        <button onClick={() => handleCopyToClipboard(HTMLWidget(userId, radius, backgroundColor, textColor, dueDate, priority))}>Copy</button>
      </section>
    </main>
  )
}
