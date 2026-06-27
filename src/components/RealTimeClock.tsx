'use client';
import { useState, useEffect } from 'react';

export default function RealTimeClock() {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
    milliseconds: '000',
    nanoseconds: '000000',
  });

  useEffect(() => {
    let animationFrameId: number;
    const updateTime = () => {
      const now = new Date();
      const nanoseconds = (performance.now() * 1000000 % 1000000).toFixed(0).padStart(6, '0');
      setTime({
        hours: now.getHours().toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds().toString().padStart(2, '0'),
        milliseconds: now.getMilliseconds().toString().padStart(3, '0'),
        nanoseconds,
      });
      animationFrameId = requestAnimationFrame(updateTime);
    };
    animationFrameId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="parent-clock">
      <div className="card-clock">
        <div className="date-box-clock">
          <span className="month-clock">REAL‑TIME</span>
          <span className="date-clock">NOW</span>
        </div>
        <div className="content-box-clock">
          <span className="card-title-clock">Divine Moment</span>
          <div className="time-display">
            <div className="time-row">
              <span className="time-value">{time.hours}</span><span className="time-label">H</span>
              <span className="time-separator">:</span>
              <span className="time-value">{time.minutes}</span><span className="time-label">M</span>
              <span className="time-separator">:</span>
              <span className="time-value">{time.seconds}</span><span className="time-label">S</span>
            </div>
            <div className="time-row-small">
              <span className="time-value-small">{time.milliseconds}</span><span className="time-label-small">ms</span>
              <span className="time-separator-small">.</span>
              <span className="time-value-small">{time.nanoseconds}</span><span className="time-label-small">ns</span>
            </div>
          </div>
          <span className="card-content-clock">Every moment is a gift from Maharaj‑ji</span>
        </div>
      </div>
    </div>
  );
}
