/**
 * @author reallongnguyen@gmail.com
 *
 */
class Factory {
  constructor() {
    this.registeredTypes = new Map();
    this.register = this.register.bind(this);
    this.create = this.create.bind(this);
  }

  register(className, classFactory) {
    if (!this.registeredTypes.has(className)) {
      this.registeredTypes.set(className, classFactory);
    } else {
      throw new Error(`The ${className} is exist`);
    }
  }

  create(className, ...options) {
    if (!this.registeredTypes.has(className)) {
      throw new Error(`Factory need ${className}Factory to create instance of ${className}`);
    }

    const classFactory = this.registeredTypes.get(className);
    return classFactory.create(options);
  }
}

// singleton
const instance = new Factory();
Object.freeze(instance);

module.exports = instance;
