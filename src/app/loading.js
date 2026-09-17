import Image from 'next/image';

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-md">
        <div className="bg-[#1b3d2f] p-4 sm:p-5 rounded-2xl shadow-2xl flex items-center justify-center border border-[#dfa62f]/30">
          <Image src="/images/logo.png" alt="Loading..." width={190} height={52} className="animate-pulse object-contain" priority />
        </div>
      </div>
    </div>
  );
}
