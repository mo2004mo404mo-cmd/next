// Tab group loader — tabs in the 'tools' group.
// Calculator, symptom, exam-countdown, dictionary, timer, notes, plus lab/exams/mnemonics.
export async function loadTab(tabId: string): Promise<{ default: React.ComponentType<any> }> {
  let mod: any;
  switch (tabId) {
    // case 'lab-values': mod = await import('@/components/medq/LabValuesTab'); break;
    // case 'exams': mod = await import('@/components/medq/ExamsTab'); break;
    // case 'mnemonics': mod = await import('@/components/medq/MnemonicsTab'); break;
    // case 'medical-calculator': mod = await import('@/components/medq/MedicalCalculatorTab'); break;
    // case 'symptom-checker': mod = await import('@/components/medq/SymptomCheckerTab'); break;
    case 'exam-countdown': mod = await import('@/components/medq/ExamCountdownTab'); break;
    // case 'medical-dictionary': mod = await import('@/components/medq/MedicalDictionaryTab'); break;
    // case 'study-timer': mod = await import('@/components/medq/StudyTimerTab'); break;
    // case 'quick-notes': mod = await import('@/components/medq/QuickNotesTab'); break;
    default: throw new Error(`Unknown tab in group tools: ${tabId}`);
  }
  return mod;
}
