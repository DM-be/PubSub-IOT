export interface SoundLevelMeasurement {
    timestamp: Date;
    soundLevel: number;
  }

export interface MovementDetection {
  timestamp: Date;
}

export interface LightStatus {
  timestamp: Date;
  status: boolean; // true if on, false if off
  callerId: string;
}

export interface LightStatusDto {
  callerId: string;
}