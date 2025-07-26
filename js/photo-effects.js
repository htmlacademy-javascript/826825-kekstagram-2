const EFFECTS = {
  sepia: {
    style: 'sepia',
    unit: '',
    updateOptions: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1
    }
  },

  chrome: {
    style: 'grayscale',
    unit: '',
    updateOptions: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1
    }
  },

  marvin: {
    style: 'invert',
    unit: '%',
    updateOptions: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1
    }
  },

  phobos: {
    style: 'blur',
    unit: 'px',
    updateOptions: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1
    }
  },

  heat: {
    style: 'brightness',
    unit: '',
    updateOptions: {
      range: { min: 1, max: 3 },
      start: 3,
      step: 0.1
    }
  },
};

const fileUpload = document.querySelector('.img-upload');
const imgPreview = fileUpload.querySelector('.img-upload__preview img');
const effectsList = fileUpload.querySelector('.effects__list');
const effectSliderContainer = fileUpload.querySelector('.img-upload__effect-level');
const sliderElement = effectSliderContainer.querySelector('.effect-level__slider');
const effectLevelValue = effectSliderContainer.querySelector('.effect-level__value');

let currentEffect = 'none';
effectSliderContainer.classList.add('hidden');


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const resetEffects = () => {
  currentEffect = 'none';
  imgPreview.style.filter = 'none';
  effectLevelValue.value = '';
  effectSliderContainer.classList.add('hidden');
  effectsList.querySelector('#effect-none').checked = true;
};

const onChangeEffects = (evt) => {
  const target = evt.target.closest('.effects__radio');
  if (!target) {
    return;
  }
  effectSliderContainer.classList.remove('hidden');

  currentEffect = target.value;

  if (currentEffect === 'none') {
    resetEffects();
    return;
  }

  const currentEffectUpdateOptions = EFFECTS[currentEffect].updateOptions;

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffectUpdateOptions.range.min,
      max: currentEffectUpdateOptions.range.max
    },
    start: currentEffectUpdateOptions.start,
    step: currentEffectUpdateOptions.step
  });
};

const onEffectsValueUpdate = () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  if (currentEffect === 'none') {
    return;
  }

  const currentEffectStyle = EFFECTS[currentEffect].style;
  const currentEffectUnit = EFFECTS[currentEffect].unit;
  const currentEffectValue = effectLevelValue.value;

  imgPreview.style.filter = `${currentEffectStyle}(${currentEffectValue}${currentEffectUnit})`;

};

effectsList.addEventListener('change', onChangeEffects);

sliderElement.noUiSlider.on('update', onEffectsValueUpdate);

export {resetEffects};
