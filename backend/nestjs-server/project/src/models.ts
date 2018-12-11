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
  callerUid: string;
}

export interface LightStatusDto {
  callerUid: string;
}