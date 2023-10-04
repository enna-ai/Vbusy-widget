"use client";

import React, { useState } from 'react';
import Input from '@/components/Input';
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

  const encodeHexColor = (color: string) => {
    if (!color.startsWith("#")) {
      color = "#" + color;
    }

    return encodeURIComponent(color);
  };

  const HTMLWidget = (
    userId: string,
    borderRadius: boolean,
    backgroundColor: string,
    textColor: string,
    dueDate: boolean,
    priorityLevel: boolean
  ) => {
    return `
      <iframe title="Vbusy Widget" src="http://localhost:3000/widget?userId=${userId}&borderRadius=${borderRadius}&backgroundColor=${encodeHexColor(backgroundColor)}&textColor=${encodeHexColor(textColor)}&dueDates=${dueDate}&priorityLevels=${priorityLevel}" width="420" height="220" frameBorder="0"></iframe>
    `;
  };

  return (
    <main className={styles.main}>
      <section className={styles.heading}>
        <h1>Vbusy Widget Builder</h1>
        <p>Retrieve your unique user ID from your Vbusy account settings.</p>
      </section>

      <section className={styles.preview}>
        <h2>Preview</h2>
        
        <iframe
          title="Vbusy Widget"
          src={`http://localhost:3000/widget?userId=${userId}&borderRadius=${radius}&backgroundColor=${encodeHexColor(backgroundColor)}&textColor=${encodeHexColor(textColor)}&dueDates=${dueDate}&priorityLevels=${priority}`}
          width="420"
          height="220"
          frameBorder="0"
        ></iframe>
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