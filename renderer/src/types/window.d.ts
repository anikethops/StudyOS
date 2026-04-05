export {};

declare global {
  interface Window {
    studyOS: {
      runStudyTool: (payload: {
        mode: "summary" | "bullets" | "questions";
        text: string;
      }) => Promise<{ ok: boolean; data?: string; error?: string }>;
    };
  }
}