import ChannelModal from "@/components/modals/channel-modal";
import DeleteChannelModal from "@/components/modals/delete-channel-modal";
import DeleteMessageModal from "@/components/modals/delete-message-modal";
import DeleteServerModal from "@/components/modals/delete-server-modal";
import InviteModal from "@/components/modals/invite-modal";
import MemberModal from "@/components/modals/member-modal";
import MessageFileModal from "@/components/modals/message-file-modal";
import ServerModal from "@/components/modals/server-modal";

export function ModalProvider() {
  return (
    <>
      <ServerModal />
      <InviteModal />
      <MemberModal />
      <ChannelModal />
      <MessageFileModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <DeleteMessageModal />
    </>
  );
}
