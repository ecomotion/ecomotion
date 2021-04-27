# ecomotion

ECOMOTION TEMPLATE FOR ITERATION

What are some current issues/roadblocks?

1. Lining up the data with the proper components on the profile page
2. Protected route is currently not protected - /flights doesn't actually check if you're logged in

WANT TO ADD:

1. save button on the main page so that flights aren't written to the database every time you press search
2. making the actions more interactive - you can choose a combination of the three actions
3. sign up option
4. option to view flights page without a profile - you wouldn't be able to save the flights for your profile page
5. maybe could be expanded to more than just flights - the carbon interface API has so much data - car emissions, based on what you're buying, etc.

CONTEXT API

1. create a context provider component titled whatever state you want to pass down and holding the state in this component.
2. wrap your top most component which holds any child you want to access data from context with a value of the info you want to pass
3. wrap the return render of the component accessing context in context.consumer tags
4. anything in these consumer tags will be an anonymous function that holds the argument context which is the value you passed in step 2.
5. React.fragment to return more than one element from the anonymous function in the context.consumer tags.
6. update state by putting updating function in your
