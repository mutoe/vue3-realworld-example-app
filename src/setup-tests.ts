/// <reference types="vitest-dom/extend-expect" />

// TODO: migrate to @testing-library/jest-dom/vitest
import 'vitest-dom/extend-expect'

// https://github.com/mswjs/msw/issues/1415#issuecomment-1650562700
location.href = 'https://api.realworld.io/'
