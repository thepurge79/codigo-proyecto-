import { pocketbaseClient as pb } from '@/lib/pocketbase-client';
import type { RecordModel } from 'pocketbase';
export type CareData = { meds: RecordModel[]; schedules: RecordModel[]; history: RecordModel[] };
export async function loadCare(): Promise<CareData> { if (!pb.authStore.isValid) return {meds:[],schedules:[],history:[]}; const [meds,schedules,history] = await Promise.all([pb.collection('Medicamentos').getFullList({sort:'nombre'}),pb.collection('Horarios_Programados').getFullList({sort:'hora'}),pb.collection('Historial_Tomas').getFullList({sort:'-created'})]); return {meds,schedules,history}; }
export function dayKey(date: Date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
export function dueToday(frequency: string, date: Date) { const day=date.getDay();return frequency==='Diaria'||(frequency==='Días laborables'?day>0&&day<6:day===0||day===6); }
