import AttachmentModal from "@/components/modals/attachment-modal";
import ChannelModal from "@/components/modals/channel-modal";
import DeleteChannelModal from "@/components/modals/delete-channel-modal";
import DeleteMessageModal from "@/components/modals/delete-message-modal";
import DeleteServerModal from "@/components/modals/delete-server-modal";
import InviteModal from "@/components/modals/invite-modal";
import LeaveModal from "@/components/modals/leave-modal";
import MemberModal from "@/components/modals/member-modal";
import ServerModal from "@/components/modals/server-modal";

export function ModalProvider() {
  return (
    <>
      <ServerModal />
      <InviteModal />
      <MemberModal />
      <ChannelModal />
      <AttachmentModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <DeleteMessageModal />
      <LeaveModal />
    </>
  );
}
