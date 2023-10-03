"use client";

import React, { useState } from 'react';
import Widget from "@/components/Widget";
import styles from '@/styles/modules/page.module.scss';

export default function Home() {
  const [userId, setUserId] = useState<string>("64fc8956eea9a7d89a5f901e");
  const [radius, setRadius] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState<string>("#181825");
  const [textColor, setTextColor] = useState<string>("#eaefff");
  const [dueDate, setDueDate] = useState<boolean>(false);
  const [priority, setPriority] = useState<boolean>(false);

  const handleUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
    console.log(event.target.value);
  };

  const handleRadius = () => {
    setRadius(!radius);
  };

  const handleDueDate = () => {
    setDueDate(!dueDate);
  };

  const handlePriority = () => {
    setPriority(!priority);
  }

  const handleBackgroundColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(event.target.value);
  };

  const handleTextColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(event.target.value);
  }

  const HTMLWidget = () => {
    return `
      <iframe src="http://localhost:3000/widget" width="300" height="200" frameborder="0"></iframe>
    `;
  };

  return (
    <main className={styles.main}>
      <h1>Vbusy Widget Builder</h1>
      <p>Grab your user ID from your user settings in Vbusy</p>
      
      <Widget userId={userId} radius={radius} backgroundColor={backgroundColor} textColor={textColor} dueDates={dueDate} priorityLevel={priority} />

      <div>
        <HTMLWidget />
        <button>Copy</button>
      </div>

      <div>
        <label>
          User ID
          <input
            type="text"
            value={userId}
            onChange={handleUserId}
          />
        </label>
      </div>

      <div>
        <label>
          Border Radius:
          <input
            type="checkbox"
            checked={radius}
            onChange={handleRadius}
          />
        </label>
      </div>

      <div>
        <label>
          Show Due Dates:
          <input
            type="checkbox"
            checked={dueDate}
            onChange={handleDueDate}
          />
        </label>
      </div>

      <div>
        <label>
          Show Priority Levels:
          <input
            type="checkbox"
            checked={priority}
            onChange={handlePriority}
          />
        </label>
      </div>

      <div>
        <label>
          Background Color:
          <input
            type="text"
            placeholder={backgroundColor}
            value={backgroundColor}
            onChange={handleBackgroundColor}
          />
        </label>
      </div>

      <div>
        <label>
          Text Color:
          <input
            type="text"
            placeholder={textColor}
            value={textColor}
            onChange={handleTextColor}
          />
        </label>
      </div>
    </main>
  )
}
