---
sidebar_position: 2
---

# Parameters

Parameters are set to organize and manipulate **groups of data**:

- **strings**
- **tokens**
- **objects**

## Strings

```md title="src/fetch-api-data.service.ts"
# addFavorite

 /**
   * Handles Adding movie to favorites 
   * expects movieID & username
   * @param movieID {string}
   * @returns array of user's favorite movies, stored as strings of ID's
   */
```

## Tokens


Tokens will be automatically generated after successful user login and are necessary for authenticated API queries. 

```md title="src/fetch-api-data.service.ts"
# userLogin

 /**
   * Handles api call for registered user to login
   * @param userDetails {any}
   * @returns user data in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    //console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
```

## Objects

Objects contain user data

```md title="src/app/user-login-form.component.ts"
# userLogin

userData = { Username: '', Password: '' };
   
```

<!-- ## Configure the Sidebar

Docusaurus automatically **creates a sidebar** from the `docs` folder.

Add metadata to customize the sidebar label and position:

```md title="docs/hello.md" {1-4}
---
sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
```

It is also possible to create your sidebar explicitly in `sidebars.js`:

```js title="sidebars.js"
module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      // highlight-next-line
      items: ['hello'],
    },
  ],
};
``` -->
