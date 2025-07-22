import { fetchCustomers } from '@/app/lib/data';
import Form from '@/app/ui/invoices/create-form';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';

export default async function Page() {
  const customers = await fetchCustomers();
  return (
    <main>
      <div className="flex items-center gap-4">
        <Link href="/dashboard/invoices" className="text-blue-600 hover:underline">Invoices</Link>
        <span className="text-gray-400">/</span>
        <span className="font-bold">Create</span>
      </div>
      <h1 className={`${lusitana.className} mt-4 text-2xl`}>Create Invoice</h1>
      <div className="mt-6">
        <Form customers={customers} />
      </div>
    </main>
  );
}
