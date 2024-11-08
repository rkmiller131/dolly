import CreateForm from "../(components)/ui/forms/CreateForm";
import Template from "./template";
import Image from "next/image";

export default function Create() {
  return (
    <Template>
      <Image
        src="/paint-palette.svg"
        height={1417}
        width={1264}
        alt="Paint Palette Background"
        className="absolute z-[-1] left-0 top-12 md:left-auto md:top-0"
      />
      <div className="flex flex-col gap-20 lg:flex-row lg:gap-5 justify-evenly items-center">
        <section className="flex flex-col gap-10">
          <div>
            <h2 className="text-4xl font-primary mb-3">
              Create
            </h2>
            <p className="text-lg font-secondary">
              Generate an imaginative image through DALL•E AI and download or share it with the community.
            </p>
          </div>
          <CreateForm />
        </section>
        <div>Picture Goes Here</div>
      </div>
    </Template>
  )
}
