import VoxelAvatar from "./VoxelAvatar";
import { avatarConfig } from "@/lib/avatar-config";
import { buildModel, countBlocks } from "@/lib/voxel";

export const BLOCK_COUNT = countBlocks(buildModel(avatarConfig));

// The page avatar: reacts to taps, dozes off when left alone, and flies to the
// next page when you navigate. The caption is its accessible label, not shown.
export default function Figure({ number, caption, greeting, pose, res, className = "", avatarClassName = "" }) {
  return (
    <figure className={className}>
      <VoxelAvatar
        interactive
        pose={pose}
        res={res}
        greeting={greeting}
        label={caption}
        className={`w-full ${avatarClassName}`}
      />
    </figure>
  );
}
