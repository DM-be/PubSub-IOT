export interface SoundLevelMeasurement {
    timestamp: Date;
    soundLevel: string;
  }

export interface MovementDetection {
  timestamp: string;
}

export interface LightStatus {
  timestamp: Date;
  status: boolean; // true if on, false if off
  callerId: string;
}

export interface LightStatusDto {
  callerId: string;
}