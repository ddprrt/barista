module.exports = {
  name: 'form-field',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/components/form-field',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
