import { HeartPulse, ShieldCheck, Leaf } from 'lucide-react';
import { AuthPanel } from '@/components/home/auth-panel';

export function LoginScreen({ done }: { done: () => void }) {
	return (
		<div className="login-screen">
			<div className="login-card">
				<a className="brand login-brand" href="/">
					<span className="brand-icon">
						<HeartPulse size={28} />
					</span>
					Medialerta
				</a>
				<AuthPanel done={done} />
				<div className="login-trust">
					<ShieldCheck size={16} />
					<span>Tu información está cifrada y solo tú puedes acceder a ella.</span>
				</div>
			</div>
			<div className="login-side" aria-hidden="true">
				<div className="login-side-inner">
					<span className="login-eyebrow">TU SALUD, A TU RITMO</span>
					<h2>Cuidarte empieza<br />por un solo paso.</h2>
					<p>
						Organiza tus medicamentos, recuerda cada dosis y lleva un historial
						privado de tu tratamiento. Un espacio tranquilo para tu cuidado, día
						a día.
					</p>
					<div className="login-bullets">
						<span><Leaf size={15} /> Recordatorios amables</span>
						<span><Leaf size={15} /> Historial exportable</span>
						<span><Leaf size={15} /> Privado y seguro</span>
					</div>
				</div>
			</div>
		</div>
	);
}
