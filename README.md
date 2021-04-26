# ecomotion

ECOMOTION TEMPLATE FOR POSSIBLE ITERATION

Link to Scratch Project Brief:

What was the original vision for the project?

If the project has strayed from the original vision, why?

How far has the project progressed?

What are some current issues/roadblocks?

What are some suggestions for iterating on this project?

CONTEXT API

1. create a context provider component titled whatever state you want to pass down and holding the state in this component.
2. wrap your top most component which holds any child you want to access data from context with a value of the info you want to pass
3. wrap the return render of the component accessing context in context.consumer tags
4. anything in these consumer tags will be an anonymous function that holds the argument context which is the value you passed in step 2.
5. React.fragment to return more than one element from the anonymous function in the context.consumer tags.
6. update state by putting updating function in your
