## Next

* Dropped the config reducer because the actual configuration object should not be changing in your application. You can modify the configuration object (for example by setting new routes), but you should always have the same base object. If you want to have the configuration object in your store, you can just include it in the initial state.
