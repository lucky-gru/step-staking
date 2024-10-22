import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full w-full items-center justify-center font-mono">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-5xl text-neutral-300">Not Found</h2>
          <p className="text-neutral-500">Could not find requested resource</p>
        </div>
        <Link href="/" className="text-teal-400 underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
