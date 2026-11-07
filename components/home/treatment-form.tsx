import { useState } from 'react';
import { pocketbaseClient as pb } from '@/lib/pocketbase-client';
import type { RecordModel } from 'pocketbase';
export function TreatmentForm({med,done}:{med?:RecordModel;done:()=>void}) {
 const [busy,setBusy]=useState(false);const [error,setError]=useState('');
 return <><span className="eyebrow">UN PASO PARA TU BIENESTAR</span><h2>{med?'Editar medicamento':'Nuevo medicamento'}</h2>
 <form onSubmit={async e=>{e.preventDefault();setBusy(true);setError('');const f=new FormData(e.currentTarget);const owner=pb.authStore.record?.id;
 try {const values={owner,nombre:f.get('nombre'),dosis:f.get('dosis'),notas:f.get('notas')};if(med)await pb.collection('Medicamentos').update(med.id,values);else {const created=await pb.collection('Medicamentos').create(values);try {for(const hora of String(f.get('horas')).split(',').map(s=>s.trim()).filter(Boolean))await pb.collection('Horarios_Programados').create({owner,medicamento:created.id,hora,frecuencia:f.get('frecuencia'),alerta:true});}catch(err){await pb.collection('Medicamentos').delete(created.id);throw err;}}done();}catch{setError('No se pudo guardar. Revisa los horarios (HH:MM) e inténtalo de nuevo.');}finally{setBusy(false);}}}>
 <label>Nombre del medicamento<input name="nombre" defaultValue={med?.nombre} required placeholder="Ej. Vitamina D" maxLength={120}/></label><label>Dosis por toma<input name="dosis" defaultValue={med?.dosis} required placeholder="Ej. 1 comprimido · 1000 UI" maxLength={120}/></label>
 {!med&&<><label>Horas de toma<input name="horas" required placeholder="08:00, 20:00" pattern="([01][0-9]|2[0-3]):[0-5][0-9](, *([01][0-9]|2[0-3]):[0-5][0-9])*"/></label><small>Separa varias horas con una coma. Formato de 24 horas.</small><label>Frecuencia<select name="frecuencia"><option>Diaria</option><option>Días laborables</option><option>Fin de semana</option></select></label></>}
 <label>Indicaciones<textarea name="notas" defaultValue={med?.notas} placeholder="Ej. Tomar después del desayuno" maxLength={1000}/></label>{error&&<p role="alert" className="form-message">{error}</p>}<button disabled={busy} className="primary wide">{busy?'Guardando…':'Guardar medicamento'}</button></form></>;
}
