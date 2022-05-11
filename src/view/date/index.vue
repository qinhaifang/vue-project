<template>
  <div>
    {{ initValue }}
    <H-date v-model="initValue" :date-config="dateConfig"></H-date>
  </div>
</template>
<script>
export default {
  data() {
    return {
      initValue: "",
      dateConfig: {
        type: "daterange",
        extend: {
          visibleShortcut: true,
          rangeSeparator: "—"
        }
      }
    };
  }
};
</script>
