import { Download, Smartphone } from 'lucide-react';
import './hydroponicsAppDownloadCTA.css';

export default function HydroponicsAppDownloadCTA() {
  return (
    <div className="hydroponics-app-download-wrapper">
      <a
        href="/Hydroponics.apk"
        download="Hydroponics.apk"
        className="hydroponics-app-download"
        aria-label="Download Hydroponics Android App"
      >
        <span className="had-icon-wrapper">
          <Smartphone size={20} aria-hidden="true" />
          <span className="had-android-dot" aria-hidden="true" />
        </span>
        <span className="had-label-compact">Android App</span>
        <span className="had-label-full">Download Hydroponics App</span>
        <Download size={16} className="had-download-icon" aria-hidden="true" />
      </a>
    </div>
  );
}
