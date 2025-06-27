export const HERD_NAME = "#herdName";

export const HERD_CPH = "#herdCph";

export const OTHER_HERDS_ON_SBI_YES = "#isOnlyHerdOnSbi";

export const OTHER_HERDS_ON_SBI_NO = "#isOnlyHerdOnSbi-2";

export const SAME_HERD_PREVIOUSLY_CLAIMED_YES = "#herdId";

export const SAME_HERD_PREVIOUSLY_CLAIMED_NO = "#herdId-2";

export function getSelectHerdSelector(textValue) {
  return `//div[contains(@class, "govuk-radios__item")][.//label[contains(normalize-space(), "${textValue}")]]//input`;
}
