export default class CommunityBuilder {
	constructor() {
		this.name = null;
		this.description = null;
		this.inviteCode = null;
		this.isPublic = null;
		this.memberCount = null;
		this.ownerUsername = null;
	}

	setName(name) {
		this.name = name;
		return this;
	}

	setDescription(description) {
		this.description = description;
		return this;
	}

	setInviteCode(inviteCode) {
		this.inviteCode = inviteCode;
		return this;
	}

	setIsPublic(isPublic) {
		this.isPublic = isPublic;
		return this;
	}

	setMemberCount(memberCount) {
		this.memberCount = memberCount;
		return this;
	}

	setOwnerUsername(ownerUsername) {
		this.ownerUsername = ownerUsername;
		return this;
	}
}

