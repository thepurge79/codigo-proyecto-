import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { loadCare } from '@/lib/care';
import { CareDashboard } from '@/components/home/care-dashboard';
export function meta({matches,location}:Route.MetaArgs) {return seo({matches,location},{title:'Cuida · Tu salud, a tu ritmo',description:'Organiza tus medicamentos, recuerda cada dosis y lleva un historial privado de tu tratamiento con Cuida.',image:'https://images.hostinger.com/03857dcf-7864-44da-88d5-150e9a07bfed/1d6ab0ec-fcf3-4499-b338-8c2a866ef157.png',jsonLd:[{'@type':'WebSite',name:'Cuida',description:'Gestión de medicamentos y tratamientos'},{'@type':'Organization',name:'Cuida',description:'Tu salud, a tu ritmo'}]});}
export async function clientLoader() {return loadCare();}
clientLoader.hydrate=true as const;
export function HydrateFallback(){return <CareDashboard data={{meds:[],schedules:[],history:[]}} loading />;}
export default function Home({loaderData}:Route.ComponentProps){return <CareDashboard data={loaderData} />;}
