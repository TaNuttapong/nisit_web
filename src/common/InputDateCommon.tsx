import { useEffect } from "react";

interface inputDateCommonProps {
  label: string;
  id: string;
}
export default function InputDateCommon({ label, id }: inputDateCommonProps) {
  useEffect(() => {
    ($(`#${id}`) as any).datetimepicker();
  }, []);
  return (
    <div className="form-group">
      {label}
      <div className="input-group date" id={id} data-target-input="nearest">
        <input
          type="text"
          className="form-control datetimepicker-input"
          data-target={`#${id}`}
        />
        <div
          className="input-group-append"
          data-target={`#${id}`}
          data-toggle="datetimepicker"
        >
          <div className="input-group-text">
            <i className="fa fa-calendar"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
