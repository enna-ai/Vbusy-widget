"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import Footer from "@/components/Footer";
import { InputConfig } from "@/utils/input";
import { BiCopy, BiCodeAlt } from "react-icons/bi";
import styles from "@/styles/modules/page.module.scss";

export default function Home() {
  const [userId, setUserId] = useState<string>("64fc8956eea9a7d89a5f901e");
  const [radius, setRadius] = useState<boolean>(true);
  const [headerColor, setHeaderColor] = useState<string>("#181926");
  const [bodyColor, setBodyColor] = useState<string>("#1e2030");
  const [textColor, setTextColor] = useState<string>("#eaefff");
  const [accentColor, setAccentColor] = useState<string>("#f5e48b");
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
      case "headerColor":
        setHeaderColor(newValue as string);
        break;
      case "bodyColor":
        setBodyColor(newValue as string);
        break;
      case "textColor":
        setTextColor(newValue as string);
        break;
      case "accentColor":
        setAccentColor(newValue as string);
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
    headerColor: string,
    bodyColor: string,
    textColor: string,
    accentColor: string,
    dueDate: boolean,
    priorityLevel: boolean
  ) => {
    return `
      <iframe
        title="Vbusy Widget"
        src="https://vbusy-widget.vercel.app/widget?userId=${userId}&borderRadius=${borderRadius}&headerColor=${encodeHexColor(headerColor)}&bodyColor=${encodeHexColor(bodyColor)}&textColor=${encodeHexColor(textColor)}&accentColor=${encodeHexColor(accentColor)}&dueDates=${dueDate}&priorityLevels=${priorityLevel}"
        width="400"
        height="200"
        frameBorder="0"
      ></iframe>
    `;
  };

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <h1 className={styles.heading}>Vbusy Widget Builder</h1>
        <p className={styles.p}>Retrieve your unique user ID from your Vbusy account settings.</p>
      </section>

      <section className={styles.settings}>
        <h2 className={styles.settingsHeading}> Options</h2>
        <div className={styles.options}>
          <Input
            inputValues={{ userId, radius, headerColor, bodyColor, textColor, accentColor, dueDate, priority }}
            handleInputChange={handleInputChange}
            inputConfig={InputConfig}
          />
        </div>
      </section>

      <section className={styles.preview}>
        <h2 className={styles.previewHeading}>Preview</h2>
        <p className={styles.previewDesc}>A preview of how your widget looks based on the options you select</p>

        <iframe
          title="Vbusy Widget"
          src={`https://vbusy-widget.vercel.app/widget?userId=${userId}&borderRadius=${radius}&headerColor=${encodeHexColor(headerColor)}&bodyColor=${encodeHexColor(bodyColor)}&textColor=${encodeHexColor(textColor)}&accentColor=${encodeHexColor(accentColor)}&dueDates=${dueDate}&priorityLevels=${priority}`}
          width="400"
          height="200"
          frameBorder="0"
        ></iframe>
      </section>

      <section className={styles.iframeCode}>
        <div className={styles.iframeCodeHeader}>
          <BiCodeAlt className={styles.codeIcon} />
          <h2 className={styles.iframeCodeHeading}>Raw HTML</h2>
        </div>
        <p className={styles.iframeCodeDesc}>Copy the code and paste onto your website</p>
        <pre className={styles.pre}>
          <button className={styles.copyBtn} onClick={() => handleCopyToClipboard(HTMLWidget(userId, radius, headerColor, bodyColor, textColor, accentColor, dueDate, priority))}><BiCopy className={styles.copyBtnIcon} /></button>
          <code className={styles.code}>
            {HTMLWidget(userId, radius, headerColor, bodyColor, textColor, accentColor, dueDate, priority)}
          </code>
        </pre>
      </section>

      <Footer />
    </main>
  )
}