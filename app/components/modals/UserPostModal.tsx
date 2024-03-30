import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import { apiNewPost } from "@/app/server";
import { utilConsoleOnlyDev } from "@/app/utils";
import { utilExtractLinks } from "@/app/utils/functions/utilExtractLinks";

export default function UserPostModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [text, setText] = React.useState("");

  const fnHandleNewPost = async () => {
    const resNewPost = await apiNewPost({
      data: {
        text: text,
        embeds: utilExtractLinks(text),
        frames: utilExtractLinks(text),
      },
    });

    utilConsoleOnlyDev(resNewPost);

    if (resNewPost) {
      onOpenChange();
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="shadow"
        className="w-full bg-[#FFCD2C] text-white"
      >
        Quack Quack
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-full">
                New Post
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2 w-full py-4">
                  <div className="">
                    <Image
                      src={"https://picsum.photos/200/300"}
                      width={40}
                      height={40}
                      alt="User"
                      className="cursor-pointer rounded-full max-w-[40px] max-h-[40px] object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-4 w-full">
                    <div className="w-full">
                      {" "}
                      <Textarea
                        label=""
                        placeholder="Start Quacking"
                        className="max-w-full"
                        onChange={(e) => setText(e.target.value)}
                      />{" "}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Emoji */}
                      <div className="">{"🤓"}</div>

                      <div className="">
                        <Button
                          onClick={fnHandleNewPost}
                          variant="shadow"
                          className="w-fit bg-[#FFCD2C] text-white"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
