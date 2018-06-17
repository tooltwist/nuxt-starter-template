<template lang="pug">
.a3-account-page
  .a3-above-the-footer
    a3-header
    section.my-header
      .container
        br
        .my-heading
          | My Profile

    br
    br
    .container
      authservice-user-details(:tenant="$authservice.user.tenant" :user-id="$authservice.user.id" change-password)

  a3-footer.a3-the-footer
</template>
