import Image from "next/image";

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <Image
                src="/images/sample.jpg"
                alt="Sample Image"
                width={600}
                height={400}
            />
        </div>
    );
}
