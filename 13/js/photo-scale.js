const SCALE_VALUE_STEP = 25;
const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;

const fileUpload = document.querySelector('.img-upload');
const imgPreview = fileUpload.querySelector('.img-upload__preview img');

const imgScale = fileUpload.querySelector('.img-upload__scale');
const scaleValueInput = imgScale.querySelector('.scale__control--value');
const scaleButtonBigger = imgScale.querySelector('.scale__control--bigger');
const scaleButtonSmaller = imgScale.querySelector('.scale__control--smaller');

let scaleValue = SCALE_VALUE_MAX;

const getScaleValue = (val) => {
  scaleValueInput.value = `${val}%`;
  imgPreview.style.transform = `scale(${val / 100 })`;
};

const onScaleButtonBiggerClick = () => {
  const changedScaleValue = scaleValue + SCALE_VALUE_STEP;
  scaleValue = changedScaleValue > SCALE_VALUE_MAX ? SCALE_VALUE_MAX : changedScaleValue;
  getScaleValue(scaleValue);
};

const onScaleButtonSmallerClick = () => {
  const changedScaleValue = scaleValue - SCALE_VALUE_STEP;
  scaleValue = changedScaleValue < SCALE_VALUE_MIN ? SCALE_VALUE_MIN : changedScaleValue;
  getScaleValue(scaleValue);
};

const resetScaleValue = () => {
  scaleValue = SCALE_VALUE_MAX;
  scaleValueInput.value = `${scaleValue}%`;
  imgPreview.style.transform = `scale(${scaleValue / 100 })`;
};

scaleButtonBigger.addEventListener('click', onScaleButtonBiggerClick);
scaleButtonSmaller.addEventListener('click', onScaleButtonSmallerClick);

export {resetScaleValue};
