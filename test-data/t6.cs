using System.Threading.Tasks;

namespace Microsoft.AspNetCore.Components
{
    public interface IComponent
    {
        void Attach(RenderHandle renderHandle);
        /// <summary>
        /// Sets parameters supplied by the component's parent in the render tree.
        /// </summary>
        /*
        bla
        */
        Task SetParametersAsync(ParameterView parameters);
    }
}
