function setAvatarProp(key, val) {
    avatarConfig[key] = val;
    applyAvatarCustomization();
    setRigStyle('skin');
}
